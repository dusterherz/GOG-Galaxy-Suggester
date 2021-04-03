import { navigationPage } from "../../types/navigation";

export interface navigationProps {
    onNavigationChanged: (navigation: navigationPage) => void;
    isNextGameDisabled: boolean;
}