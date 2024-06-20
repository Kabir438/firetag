import { SetterOrUpdater, useRecoilState } from "recoil"
import { loading as loadingAtom } from "../state/index"

export const useLoading: () => [boolean, (val?: boolean) => void ] = () => {
    const [loading, setLoading] = useRecoilState(loadingAtom);
    const modifiedSetLoading: (val?: boolean) => void = (toLoading: boolean = !loading) => {
        setLoading(toLoading);
    };
    return [loading, modifiedSetLoading]
}