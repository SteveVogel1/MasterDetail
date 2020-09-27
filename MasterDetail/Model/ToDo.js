import {Attribute} from "./Attribute.js";

export { Todo }


const Todo = (id) => {
    const idAttr          = id;
    const titleAttr       = Attribute("New Todo");
    const descriptionAttr = Attribute("");
    const dateAttr        = Attribute("");
    const doneAttr        = Attribute(false);

    const save = () => {
        titleAttr.saveValue();
        descriptionAttr.saveValue();
        dateAttr.saveValue();
        doneAttr.saveValue();
    };

    const undo = () => {
        titleAttr.undoValue();
        descriptionAttr.undoValue();
        dateAttr.undoValue();
        doneAttr.undoValue();
    }

    return {
        getTitle:               titleAttr.valueObs.getValue,
        setTitle:               titleAttr.valueObs.setValue,
        onChangeTitle:          titleAttr.valueObs.onChange,
        getTitleIsDirty:        titleAttr.isDirtyObs,

        getDescription:         descriptionAttr.valueObs.getValue,
        setDescription:         descriptionAttr.valueObs.setValue,
        onChangeDescription:    descriptionAttr.valueObs.onChange,
        getDescriptionIsDirty:  descriptionAttr.isDirtyObs,

        getDate:                dateAttr.valueObs.getValue,
        setDate:                dateAttr.valueObs.setValue,
        onChangeDate:           dateAttr.valueObs.onChange,
        getDateIsDirty:         dateAttr.isDirtyObs,

        getDone:                doneAttr.valueObs.getValue,
        setDone:                doneAttr.valueObs.setValue,
        onChangeDone:           doneAttr.valueObs.onChange,
        getDoneIsDirty:         doneAttr.isDirtyObs,

        getId:                  idAttr,

        save:                   save,
        undo:                   undo
    }
};