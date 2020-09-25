import {Attribute} from "./PresentationModel.js";

export { Todo }


const Todo = (id) => {
    const idAttr          = id;
    const titleAttr       = Attribute("");
    const descriptionAttr = Attribute("");
    const dateAttr        = Attribute("");
    const doneAttr        = Attribute(false);

    return {
        getTitle:               titleAttr.valueObs.getValue,
        setTitle:               titleAttr.valueObs.setValue,
        onChangeTitle:          titleAttr.valueObs.onChange,

        getDescription:         descriptionAttr.valueObs.getValue,
        setDescription:         descriptionAttr.valueObs.setValue,
        onChangeDescription:    descriptionAttr.valueObs.onChange,

        getDate:                dateAttr.valueObs.getValue,
        setDate:                dateAttr.valueObs.setValue,
        onChangeDate:           dateAttr.valueObs.onChange,

        getDone:                doneAttr.valueObs.getValue,
        setDone:                doneAttr.valueObs.setValue,
        onChangeDone:           doneAttr.valueObs.onChange,

        getId:                  idAttr
    }
};