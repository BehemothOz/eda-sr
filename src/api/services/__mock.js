export const initialUser = [
    [
        '000-S',
        {
            id: '000-S',
            login: 'some@sm.bg',
            firstName: '',
            middleName: '',
            lastName: '',
            secretQuestion: 1,
            secretAnswer: '2',
        },
    ],
];

export const initialTasks = [
    {
        id: 1,
        title: 'Cook pasta with chicken',
        type: '',
        plannedStartTime: new Date(2021, 9, 1),
        plannedEndTime: new Date(2021, 9, 25),
        actualStartTime: null,
        actualEndTime: null,
    },
];
