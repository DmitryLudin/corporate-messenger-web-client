import { observer } from 'mobx-react-lite';
import { memo, FunctionComponent } from 'react';

export function withObserver<T extends object>(
  component: FunctionComponent<T>,
  isMemo = false
) {
  if (isMemo) {
    return memo(component);
  }

  return observer(component);
}
