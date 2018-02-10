export const createTask = async ({ priority, status, content }, { api }) => {

    const dateId = new Date();
    const obj = {
        'id': dateId.getTime(),
        priority,
        status,
        content
    };
    const response = await fetch(api,
        {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        }
    );

    if (response.status !== 201) {
        throw new Error('Failed to create new task');
    }

    // const inArr = [];
    // inArr.push(await response.json());


};

export const removeTask = async (id, { api }) => {
    await fetch(`${api}/${id}`,
        { method: 'DELETE' });

};

export const getTasks = async (api) => {
    const response = await fetch(api);

    return response;
};

export const editTask = async ({ id, priority, status, content }, { api }) => {

    await fetch(`${api}/${id}`, {
        method:  'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id,
            priority,
            status,
            content
        })
    });

};

export const completeTask = async (id, api) => {

    await fetch(`${api}/${id}`, {
        method:  'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id,
            status: 'checked'
        })

    });

};

export const unCompleteTask = async (id, api) => {
    await fetch(`${api}/${id}`, {
        method:  'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            id,
            status: ''
        })

    });
};

