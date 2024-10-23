import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import store from '../store/store';
import { paths, endpoints } from '../utils/paths';
import { Perfiles } from '../utils/constants';
import { getAccessToken } from '../utils/cookie';
import { jwtDecode } from 'jwt-decode';
import { login } from '../store/actions/authActionSync';

//Actions
import { cargarAbogados,cargarDelegados,cargarSubfases,cargarClasesDoc,
  CargarSubtipoDanio,CargarDependenciaMininter,CargarProcuradores,CargarDepartamentos } from '../store/actions/app/appActionAsync';


//General
import LoginPage from '../pages/externalPages/login/LoginPage';
import NotFoundPage from '../pages/extra/NotFoundPage';
import InternalPage from '../pages/internalPages/InternalPage';
import HomePage from '../pages/internalPages/home/HomePage';

//Modulo Consulta Legajos
import ConsultaLegajosPage from '../pages/internalPages/consultaLegajos/ConsultaLegajosPage';
import MisLegajosPage from '../pages/internalPages/consultaLegajos/MisLegajosPage';
import TodosLegajosPage from '../pages/internalPages/consultaLegajos/TodosLegajosPage';
import ListadoLegajosPage from '../pages/internalPages/consultaLegajos/listadoLegajos/ListadoLegajosPage';
import LegajoPage from '../pages/internalPages/consultaLegajos/legajo/LegajoPage';
import DetalleLegajoPage from '../pages/internalPages/consultaLegajos/legajo/detalleLegajo/DetalleLegajoPage';
import DocsIngresoPage from '../pages/internalPages/consultaLegajos/legajo/documentosIngreso/DocsIngresoPage';
import DocsSalidaPage from '../pages/internalPages/consultaLegajos/legajo/documentosSalida/DocsSalidaPage';
import CrearDocPage from '../pages/internalPages/consultaLegajos/legajo/crearDocumento/CrearDocPage';
import SalidaSectionPage from '../pages/internalPages/consultaLegajos/legajo/documentosSalida/SalidaSectionPage';
//Módulo Audiencias
import AudienciasPage from '../pages/internalPages/audiencias/AudienciasPage';
import MisAudienciasPage from '../pages/internalPages/audiencias/misAudiencias/MisAudienciasPage';
import TodasAudienciasPage from '../pages/internalPages/audiencias/todasAudiencias/TodasAudienciasPage';

//Modulo Reporte Legajos
import ReporteLegajosPage from '../pages/internalPages/reporteLegajos/ReporteLegajosPage';
import ReporteGeneralPage from '../pages/internalPages/reporteLegajos/reporteGeneral/ReporteGeneralPage';
import SeguimientoPage from '../pages/internalPages/reporteLegajos/seguimiento/SeguimientoPage';

//Modulo Recepcion Legajos
import RecepcionPage from '../pages/internalPages/recepcionLegajos/RecepcionPage';
import NuevoLegajoPage from '../pages/internalPages/recepcionLegajos/nuevoLegajo/NuevoLegajoPage';
import AdicionarDocsPage from '../pages/internalPages/recepcionLegajos/adicionarDocumentos/AdicionarDocsPage';
import InicioRecepcionPage from '../pages/internalPages/recepcionLegajos/InicioRecepcionPage';


const RoutesApp = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const userId = store.getState().auth.user.usuId;
  const perfilId = store.getState().auth.user.perfilId;
  const dispatch = useDispatch();


  useEffect(() => {
    
    const token = getAccessToken();
    if (token) {
      const tokenDecode = jwtDecode(token);
      console.log("Token decodificado: ", tokenDecode);
      const user = {
        usuId: tokenDecode.UsuId,
        usuUsername: tokenDecode.UsuUsername,
        usuNombre: tokenDecode.UsuNombre,
        usuApellidoPat: tokenDecode.UsuApellidoPat,
        usuApellidoMat: tokenDecode.UsuApellidoMat,
        perfilId: tokenDecode.PerfilId,
        usuEmail: tokenDecode.UsuEmail,
        usuImage: tokenDecode.UsuImage,
      };
      console.log("Usuario Logeado: ", user);
      dispatch(login(user));
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {

      dispatch(cargarAbogados())
      dispatch(cargarSubfases())
      dispatch(cargarDelegados())
      dispatch(cargarClasesDoc(1))
      dispatch(cargarClasesDoc(0))
      dispatch(CargarSubtipoDanio())
      dispatch(CargarDependenciaMininter())
      dispatch(CargarProcuradores())
      dispatch(CargarDepartamentos())
    }
  }, [dispatch, isAuthenticated]);

  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}

        <Route path={endpoints.LOGIN} element={<LoginPage />} />

        {/* Rutas protegidas*/}
        <Route path="/" element={<InternalPage isAuthenticated={isAuthenticated} />}>
          <Route index element={<HomePage />} />
          <Route path={endpoints.HOME} element={<HomePage />} />

          <Route path={endpoints.CONSULTA_LEGAJOS} element={<ConsultaLegajosPage />}>

            <Route path={endpoints.MIS_LEGAJOS} element={<MisLegajosPage />}>
              <Route index element={<ListadoLegajosPage allLegajos = {false}/>} />
              <Route path=":id" element={<LegajoPage />} >
                <Route path={endpoints.DETALLE_LEGAJO} element={<DetalleLegajoPage />} />
                <Route path={endpoints.DOCS_INGRESO_LEGAJO} element={<DocsIngresoPage />} />
                <Route path={endpoints.DOCS_SALIDA_LEGAJO} element={<SalidaSectionPage />} >
                  <Route index element={<DocsSalidaPage/>} />
                  <Route path={`${endpoints.CREAR_DOC}/:claseDocumento`} element={<CrearDocPage />} />
                </Route>
              </Route>
            </Route>

            <Route path={endpoints.TODOS_LEGAJOS} element={<TodosLegajosPage />}>
              <Route index element={<ListadoLegajosPage allLegajos = {true}/>} />
              <Route path=":id" element={<LegajoPage />} >
                <Route path={endpoints.DETALLE_LEGAJO} element={<DetalleLegajoPage />} />
                <Route path={endpoints.DOCS_INGRESO_LEGAJO} element={<DocsIngresoPage />} />
                <Route path={endpoints.DOCS_SALIDA_LEGAJO} element={<SalidaSectionPage />} >
                  <Route index element={<DocsSalidaPage/>} />
                  <Route path={`${endpoints.CREAR_DOC}/:claseDocumento`} element={<CrearDocPage />} />
                </Route>
              </Route>
            </Route>

          </Route>

          <Route path={endpoints.AUDIENCIAS} element={<AudienciasPage></AudienciasPage>}>
            <Route path={endpoints.MIS_AUDIENCIAS} element={<MisAudienciasPage />} />
            <Route path={endpoints.TODAS_AUDIENCIAS} element={<TodasAudienciasPage />} />
          </Route>


          <Route path={endpoints.REPORTE_LEGAJOS} element={<ReporteLegajosPage></ReporteLegajosPage>}>
            <Route path={endpoints.REPORTE_GENERAL} element={<ReporteGeneralPage />} />
            <Route path={endpoints.SEGUIMIENTO} element={<SeguimientoPage />} />
          </Route>

          <Route path={endpoints.RECEPCION_LEGAJOS} element={<InicioRecepcionPage/>} >
            <Route index element={<RecepcionPage />} />
            <Route path={endpoints.NUEVO_LEGAJO} element={<NuevoLegajoPage/>} />
            <Route path={endpoints.ADICIONAR_LEGAJO} element={<AdicionarDocsPage/>} />
          </Route>
        </Route>

          

        <Route path="*" component={<NotFoundPage />} />

      </Routes>
    </Router>
  );
};

export default RoutesApp;