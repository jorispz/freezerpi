import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/root";

import { logger, sagaLogger } from "./logger";
import { doorReducer } from "./reducer";
import { buzzer } from "./gpio/rpi/buzzer";

logger.info("Booting FreezerPI");

const sagaMiddleware = createSagaMiddleware({ logger: sagaLogger });
const store = createStore(doorReducer, applyMiddleware(sagaMiddleware));
const rootTask = sagaMiddleware.run(rootSaga);

const shutdown = () => {
  logger.info("Shutting down");
  rootTask.cancel();
  process.exit();
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
