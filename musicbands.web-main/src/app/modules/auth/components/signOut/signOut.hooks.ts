import {useNavigate} from "react-router";
import {authService} from "../../services/auth.service";
import {navigationService} from "../../../_common/services/navigation.service";

export function useFacade(): [Function] {
    const navigate = useNavigate();

    const handleSignOut = () => {
        authService.signOut();
        navigationService.toSignIn(navigate);
    }

    return [handleSignOut]
}