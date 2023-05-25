import { UserAvatar } from 'shared/components/user-avatar';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc/with-observer.hoc';

function AccountMemo() {
  const user = userService.store.user;

  if (!user) return null;

  return <UserAvatar isOnline name={user.username?.toUpperCase() || ''} />;
}

export const Account = withObserver(AccountMemo);
