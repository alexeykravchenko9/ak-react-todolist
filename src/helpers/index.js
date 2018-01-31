// import dataTasks from './data.json';

{ /*
export const addTaskJSON = (priority, status, text) => {
    let obj = {
        id: getUniqueID(10),
        priority,
        status,
        text
    };

    fs.writeFile(dataTasks, JSON.stringify(obj), (err) => {
        if (err) throw new Error(`Data weren't added to the JSON file`);
        console.log('Data was added!');
    });

}
*/ }

export const getUniqueID = (length = 15) => {
    if (typeof length !== 'number') {
        throw new Error('The function argument should be a number!');
    }

    let text = '';
    const possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};

export const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
};
