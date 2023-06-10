import {useState} from 'react'
import {IDialogState} from "../../states/dialogState";

export function useFacade(): [IDialogState, Function] {
    const [state, setState] = useState({
        isOpen: true,
    } as IDialogState);

    const handleMenuToggle = () => {
        setState(state => ({
            ...state,
            isOpen: !state.isOpen
        }));
    };

    return [state, handleMenuToggle]
}
