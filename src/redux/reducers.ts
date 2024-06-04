import { combineReducers } from 'redux';
import auth, { AuthState } from 'modules/auth/redux/auth.reducers';
import accounts, {
  AccountsState,
} from 'modules/accounts/redux/accounts.reducers';
import core, { CoreState } from 'modules/core/redux/core.reducers';

export type RootStoreType = Readonly<{
  core: CoreState;
  auth: AuthState;
  accounts: AccountsState;
}>;

const reducers = combineReducers({
  core,
  auth,
  accounts,
});

export default reducers;
