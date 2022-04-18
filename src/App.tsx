import { useState, useEffect } from 'react'

import { Button } from './components/Button/Button'
import { GridItemType } from './types/GridItemType'
import logoImage from './assets/devmemory_logo.png'
import { InfoItem } from "./components/InfoItem"
import RestartIcon from "./assets/restart.svg"
import { items } from './data/items'
import * as C from "./AppStyles"

const App = () => {
  const [timeElapsed, setTimeElapsed] = useState<number>(0)
  const [shownCount, setShownCount] = useState<number>(0)
  const [playing, setPlaying] = useState<boolean>(false)
  const [moveCount, setMoveCount] = useState<number>(0)
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);


  useEffect(() => resetAndCreateGrid(), [])

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

  return(
   <C.Container>
     <C.Info>
       <C.LogoLink>
          <img src={logoImage} alt="" width="200"/>
       </C.LogoLink>
       <C.InfoArea>
          <InfoItem label="tempo" value="00:00" />
          <InfoItem label="Movimentos" value="0" />
       </C.InfoArea>
       <Button label="Reiniciar" icon={RestartIcon} onClick={resetAndCreateGrid} />
     </C.Info>
     <C.GridArea>
       <C.Grid>

       </C.Grid>
     </C.GridArea>
   </C.Container>
  )
}

export default App