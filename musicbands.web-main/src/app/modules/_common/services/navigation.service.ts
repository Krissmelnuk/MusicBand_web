export class NavigationService {
    public goUp(): void {
        window.scrollTo(0, 0);
    }

    public toSignIn(navigate): void {
        navigate('/sign-in');
        this.goUp();
    }

    public toSignUp(navigate): void {
        navigate('/sign-up');
        this.goUp();
    }

    public toForgotPassword(navigate): void {
        navigate('/forgot-password');
        this.goUp();
    }

    public toHome(navigate): void {
        navigate('/');
        this.goUp();
    }

    public toDashboard(navigate): void {
        navigate('/dashboard');
        this.goUp();
    }

    public toAccount(navigate): void {
        navigate('/account');
        this.goUp();
    }

    public toBandProfile(navigate, bandUrl: string): void {
        navigate(`/profile/${bandUrl}`);
        this.goUp();
    }

    public toManageBandProfile(navigate, id: string): void {
        navigate(`/manage-profile/${id}`);
        this.goUp();
    }

    public toAllBands(navigate): void {
        navigate('/bands');
        this.goUp();
    }

    public toCreateBand(navigate): void {
        navigate('/bands/create');
        this.goUp();
    }
}

export const navigationService = new NavigationService();