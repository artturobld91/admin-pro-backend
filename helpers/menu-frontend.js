
const getMenuFrontend = ( role = 'USEr_ROLE' ) => {
    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu: [
            { titulo : 'Main', url: '/' },
            { titulo : 'ProgressBar', url: 'progress' },
            { titulo : 'Graficas', url: 'grafica1' },
            { titulo : 'Promise', url: 'promise' },
            { titulo : 'RXJS', url: 'rxjs' },
            { titulo : 'Profile', url: 'profile' }
          ]
        },
        {
          titulo: 'Manteinance',
          icono: 'mdi mdi-folder-lock-open',
          submenu: [
            //{ titulo : 'Users', url: 'users' },
            { titulo : 'Hospitals', url: 'hospitals' },
            { titulo : 'Doctors', url: 'doctors' },
          ]
        }
        ];

    if( role === 'ADMIN_ROLE' )
    {
        menu[1].submenu.unshift({ titulo : 'Users', url: 'users' })
    }

    return menu;
}

module.exports = {
    getMenuFrontend
}