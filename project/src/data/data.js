let data = {
    tasks: {
        'task-1': { id: 'task-1', title: 'Task-1 title', description: 'Task-1 description'},
        'task-2': { id: 'task-2', title: 'Task-2 title', description: 'Task-2 description'},
        'task-3': { id: 'task-3', title: 'Task-3 title', description: 'Task-3 description'},
        'task-4': { id: 'task-4', title: 'Task-4 title', description: 'Task-4 description'}
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
        }
    },
    columnOrder: ['column-1', 'column-2'],
    totalTasks: 4
}

export default data;