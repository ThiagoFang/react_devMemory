import * as C from './styles'

type Props = {
    label: String;
    value: String;
}

export const InfoItem = ({ label, value }:Props ) => {
    return (
        <C.Container>
            <C.Label>{label}</C.Label>
            <C.Value>{value}</C.Value>
        </C.Container>
    );
}