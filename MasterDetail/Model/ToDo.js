const Todo = (id) => {
    const idAttr          = id++;
    const titleAttr       = Observable("");
    const descriptionAttr = Observable("");
    const dateAttr        = Observable("");
    const doneAttr        = Observable(false);

    return {
        getTitle:         titleAttr.getValue,
        setTitle:         titleAttr.setValue,
        onChangeTitle:    titleAttr.onChange,

        getDescription:         descriptionAttr.getValue,
        setDescription:         descriptionAttr.setValue,
        onChangeDescription:    descriptionAttr.onChange,

        getDate:         dateAttr.getValue,
        setDate:         dateAttr.setValue,
        onChangeDate:    dateAttr.onChange,

        getDone:         doneAttr.getValue,
        setDone:         doneAttr.setValue,
        onChangeDone:    doneAttr.onChange,

        getId:           id
    }
};