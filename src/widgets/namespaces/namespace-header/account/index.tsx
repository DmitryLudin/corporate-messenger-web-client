import { UserAvatar } from 'entities/user';
import { userService } from 'shared/domains/user';
import { withObserver } from 'shared/lib/hoc';

function AccountMemo() {
  const user = userService.store.user;

  if (!user) return null;

  return <UserAvatar isOnline name={user.username || ''} />;
}

export const Account = withObserver(AccountMemo);
