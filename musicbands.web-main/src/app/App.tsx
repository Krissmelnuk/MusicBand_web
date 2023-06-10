import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route, Navigate
} from 'react-router-dom'
import './App.css'
import {BandProfilePage} from './modules/bands/pages/bandProfile/bandProfile.page'
import {HomePage} from "./pages/home/home.page";
import {AllBandsPage} from "./modules/bands/pages/allBands/allBands.page";
import {SignInPage} from "./modules/auth/pages/signIn/signIn.page";
import {SignUpPage} from "./modules/auth/pages/signUp/signUp.page";
import {ForgotPasswordPage} from "./modules/auth/pages/forgotPassword/forgotPassword.page";
import {persistState} from "@datorama/akita";
import {DashboardPage} from "./pages/dashboard/dashboard.page";
import {ProtectedRoute} from "./modules/_common/components/protectedRoute/protectedRoute";
import {CreateBandPage} from "./modules/bands/pages/createBand/createBand.page";
import {SnackBarComponent} from "./modules/_common/components/snackBar/snackBar.component";
import {AccountPage} from "./modules/auth/pages/account/account.page";
import {ManageBandProfilePage} from "./modules/bands/pages/manageBandProfile/manageBandProfile.page";
import {AutoSignOutComponent} from "./modules/auth/components/autoSignOut/autoSignOut.component";
import {ThemeProvider} from "@mui/material";
import defaultTheme from "./style/themes/default.theme";
import {RestorePasswordPage} from "./modules/auth/pages/restorePassword/restorePassword.page";

persistState({
    include: ['auth']
});

function App() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Router>
                <Routes>
                    <Route path='/sign-in' element={<SignInPage/>}/>
                    <Route path='/sign-up' element={<SignUpPage/>}/>
                    <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
                    <Route path='/restore-password' element={<RestorePasswordPage/>}/>
                    <Route path='/profile/:bandUrl' element={<BandProfilePage/>}/>
                    <Route path='/bands' element={<AllBandsPage/>}/>
                    <Route path='/bands/create' element={
                        <ProtectedRoute>
                            <CreateBandPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='/dashboard' element={
                        <ProtectedRoute>
                            <DashboardPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='/account' element={
                        <ProtectedRoute>
                            <AccountPage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='/manage-profile/:id' element={
                        <ProtectedRoute>
                            <ManageBandProfilePage/>
                        </ProtectedRoute>
                    }/>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
                <SnackBarComponent/>
                <AutoSignOutComponent/>
            </Router>
        </ThemeProvider>
    )
}

export default App
