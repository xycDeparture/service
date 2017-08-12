import { combineReducers } from 'redux'
import appReducer from '../controllers/app/reducer'
import mainReducer from '../controllers/main/reducer'
import myTimeReducer from '../controllers/mytime/reducer'
import netWorkTimeReducer from '../controllers/netWorkTime/reducer'
import myClientsReducer from '../controllers/myClients/reducer'
import clientAddReducer from '../controllers/clientAdd/reducer'
import myIntegralReducer from '../controllers/myIntegral/reducer'
import integralDetailReducer from '../controllers/integralDetail/reducer'
import updateInfosReducer from '../controllers/updateInfos/reducer'
import apptReducer from '../controllers/appt/reducer'
import myVisitedCardReducer from '../controllers/myVisitedCard/reducer'
import LoginReducer from 'application/controllers/managerLogin/reducer'
import MessageReducer from 'application/controllers/message/reducer'
import DataLoadingReducer from 'application/controllers/dataLoading/reducer'
import ClientDetailReducer from '../controllers/clientDetail/reducer'
import OrderRecordesReducer from '../controllers/orderRecords/reducer'
import apptDetailReducer from '../controllers/apptDetail/reducer'
import ErrorPageReducer from 'application/controllers/error/reducer'

export default function createReducer() {
    return combineReducers({
        app: appReducer,
        main: mainReducer,
        myTime: myTimeReducer,
        netWorkTime: netWorkTimeReducer,
        myClients: myClientsReducer,
        clientAdd: clientAddReducer,
        myIntegral: myIntegralReducer,
        integralDetail: integralDetailReducer,
        updateInfos: updateInfosReducer,
        appt: apptReducer,
        myVisitedCard: myVisitedCardReducer,
        managerLogin: LoginReducer,
        appDataLoading: DataLoadingReducer,
        appMessage: MessageReducer,
        clientDetail: ClientDetailReducer,
        orderRecords: OrderRecordesReducer,
        apptDetail: apptDetailReducer,
        errorPage: ErrorPageReducer
    })
}
