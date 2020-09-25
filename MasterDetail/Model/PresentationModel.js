
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
    }

    const undoValue = () => {
        valueObs.setValue(oldValue);
    }

    return { valueObs, isDirtyObs, saveValue, undoValue }
};
