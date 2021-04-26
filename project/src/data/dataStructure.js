let data = {
    tasks: {
        'task-1': { id: 'task-1', title: 'Task-1 title', description: 'Task-1 description', done: 'false'},
        'task-2': { id: 'task-2', title: 'Task-2 title', description: 'Task-2 description', done: 'true'},
        'task-3': { id: 'task-3', title: 'Task-3 title', description: 'Task-3 description', done: 'false'},
        'task-4': { id: 'task-4', title: 'Task-4 title', description: 'Task-4 description', done: 'true'},
        'task-5': { id: 'task-5', title: 'Task-5 title', description: 'Task-5 description', done: 'false'},
        'task-6': { id: 'task-6', title: 'Task-6 title', description: 'Task-6 description', done: 'true'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'To-do',
            taskIds: ['task-1', 'task-2']
        },
        'column-2': {
            id: 'column-2',
            title: 'Doing',
            taskIds: ['task-3', 'task-4']
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: ['task-5', 'task-6']
        }
    },
    columnOrder: ['column-1', 'column-2', 'column-3'],
    totalTasks: 6,

    // regular state data
    createCardButtonOpen: false,
    newListName: ''
}

export default data;