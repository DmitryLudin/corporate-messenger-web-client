import { UserAvatar } from 'components/user-avatar';
import { withObserver } from 'hoc/with-observer.hoc';
import React from 'react';
import { userService } from 'shared/domains/user/user.service';

function AccountMemo() {
  const user = userService.store.user;

  if (!user) return null;

  return <UserAvatar isOnline name={user.username?.toUpperCase() || ''} />;
}

export const Account = withObserver(AccountMemo);
