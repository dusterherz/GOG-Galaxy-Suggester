import { preferences } from "../../types/preferences";

export interface preferencesProps {
    preferences: preferences;
    onPreferencesChanged: (preferences: preferences) => void;
}