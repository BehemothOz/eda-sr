import { typeList } from 'components/inputs/TypeSelect';
// import { typeList } from 'components/inputs/TypeSelect';

/*
    Used for select.
    Get label by option value.
*/

export const getLabelByValue = list => value => {
    return list.reduce((acc, it) => (it.value === value ? it.label : acc), '');
};

export const getLabelForTypeList = getLabelByValue(typeList);
