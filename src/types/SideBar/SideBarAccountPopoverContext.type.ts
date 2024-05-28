export type SideBarAccountPopoverContextType = {
    settingsOpened: boolean,
    signInOpened: boolean,
    signUpOpened: boolean,
    openSettings: () => void,
    openSignIn: () => void,
    openSignUp: () => void,
    closeSettings: () => void,
    closeSignIn: () => void,
    closeSignUp: () => void
};