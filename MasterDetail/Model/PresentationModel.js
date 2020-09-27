
import { Observable } from "../observable/observable.js";

export { Attribute }

const Attribute = value => {

    const valueObs = Observable(value);
    const isDirtyObs = Observable(false);

    let oldValue = "";

    valueObs.onChange = (val) => {
        isDirtyObs.setValue(val !== oldValue)
    }


    const saveValue = () => {
        oldValue = valueObs.getValue();
        isDirtyObs.setValue(false);
    }

    const undoValue = () => {
        valueObs.setValue(oldValue);
        isDirtyObs.setValue(false);
    }

    return { valueObs, isDirtyObs, saveValue, undoValue }
};
