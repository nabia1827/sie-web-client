export const allRoutes = [
    {
      path: "/",
      component: ListadoLegajosPage,
      exact: true,
      roles: [Perfiles.ABOGADO, Perfiles.ADMIN],
    },
    {
      path: paths.HOME,
      component: ListadoLegajosPage,
      exact: true,
      roles: [Perfiles.ABOGADO, Perfiles.ADMIN],
    },
    {
      path: paths.CONSULTA_LEGAJOS,
      component: ListadoLegajosPage,
      exact: true,
      roles: [Perfiles.ABOGADO, Perfiles.ADMIN],

    },

  ];