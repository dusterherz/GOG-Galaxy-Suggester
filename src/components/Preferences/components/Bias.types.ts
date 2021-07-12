import { bias, preferences } from "../../../types/preferences";

export interface biasProps {
    headerText: string,
    name: string,
    biasValue: bias,
    preferences: preferences;
    onPreferencesChanged: (preferences: preferences) => void;
}