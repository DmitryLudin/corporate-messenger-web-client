import { UserAvatar, userService } from 'entities/user';
import { withObserver } from 'shared/lib/hoc';

function AccountMemo() {
  const user = userService.store.user;

  if (!user) return null;

  return <UserAvatar isOnline name={user.username?.toUpperCase() || ''} />;
}

export const Account = withObserver(AccountMemo);
