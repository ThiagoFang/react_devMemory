import { useState, useEffect } from 'react'

import RestartIcon from "./assets/restart.svg"
import logoImage from './assets/devmemory_logo.png'

import { formatTimeElapsed } from './helpers/formatTimeElapsed'
import { GridItem } from './components/GridItem'
import { Button } from './components/Button/Button'
import { GridItemType } from './types/GridItemType'
import { InfoItem } from "./components/InfoItem"
import { items } from './data/items'
import * as C from "./AppStyles"

const App = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);


  useEffect(() => resetAndCreateGrid(), [])

  useEffect(()=>{
    const timer = setInterval(() => {
      if(playing) setTimeElapsed(timeElapsed + 1);
    }, 1000)
    return () => clearInterval(timer)
  }, [playing, timeElapsed])

  useEffect(() => {
    if(shownCount === 2) {
      const opened = gridItems.filter(item => item.shown === true)

      if(opened.length === 2) {

        if(opened[0].item === opened[1].item) {
          const tmpGrid = [...gridItems]
          for(let i in tmpGrid) {
            if(tmpGrid[i].shown) {
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false;
            }
          }
          setGridItems(tmpGrid)
          setShownCount(0)
        } else {
          setTimeout(()=>{
            const tmpGrid = [...gridItems]
            for(let i in tmpGrid) {
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid)
            setShownCount(0)
          },1200)
        }
        setMoveCount(moveCount => moveCount + 1)
      }
    }
  }, [shownCount, gridItems])

  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
      setPlaying(false);
    }
  },[moveCount, gridItems])

  const resetAndCreateGrid = () => {
    resetGame()

    const tmpGrid: GridItemType[] = [];
    for(let i = 0; i < items.length * 2; i++) {
      tmpGrid.push({
        item: null,
        shown: false,
        permanentShown: false
      })
    }

    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++) {
        let pos = -1
        while(pos < 0 || tmpGrid[pos].item !== null) {
           pos = Math.floor(Math.random() * (items.length * 2))
        }
        tmpGrid[pos].item = i
      }
    }

    setGridItems(tmpGrid)
    setPlaying(true)
  }

  const resetGame = () => {
    setTimeElapsed(0)
    setMoveCount(0)
    setShownCount(0)
  }

  const handleItemClick = (index: number) => {
    if(playing && index !== null && shownCount < 2) {
      const tmpGrid = [...gridItems];
        if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
          tmpGrid[index].shown = true
          setShownCount(shownCount + 1)
        }
      setGridItems(tmpGrid)
    }
  }

  return(
   <C.Container>
     <C.Info>
       <C.LogoLink>
          <img src={logoImage} alt="" width="200"/>
       </C.LogoLink>
       <C.InfoArea>
          <InfoItem label="tempo" value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label="Movimentos" value={String(moveCount)} />
       </C.InfoArea>
       <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
     </C.Info>
     <C.GridArea>
       <C.Grid>
          {gridItems.map((item, index)=>(
            <GridItem 
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
       </C.Grid>
     </C.GridArea>
   </C.Container>
  )
}

export default App