const allRoles = [];

export const PERMISSION_SUPERADMIN = 'superadmin';
allRoles.push({
  roleId: PERMISSION_SUPERADMIN,
  description: 'SUPERADMIN',
});

export const PERMISSION_AUTHENTICATED = '$authenticated';
allRoles.push({
  roleId: PERMISSION_AUTHENTICATED,
  description: '$authenticated',
});

export const PERMISSION_EVERYONE = '$everyone';
allRoles.push({
  roleId: PERMISSION_EVERYONE,
  description: '$everyone',
});

export const PERMISSION_UNAUTHENTICATED = '$unauthenticated';
allRoles.push({
  roleId: PERMISSION_UNAUTHENTICATED,
  description: '$unauthenticated',
});

export const PERMISSION_READ_ALL = 'all.read';
allRoles.push({
  roleId: PERMISSION_READ_ALL,
  description: 'Xem tất cả',
});

export const PERMISSION_CREATE_USER = 'user.create';
allRoles.push({
  roleId: PERMISSION_CREATE_USER,
  description: 'Tạo tài khoản',
});

export const PERMISSION_UPDATE_USER = 'user.update';
allRoles.push({
  roleId: PERMISSION_UPDATE_USER,
  description: 'Cập nhật tài khoản',
});

export const PERMISSION_REMOVE_USER = 'user.remove';
allRoles.push({
  roleId: PERMISSION_REMOVE_USER,
  description: 'Xóa tài khoản',
});

export const PERMISSION_READ_USER = 'user.read';
allRoles.push({
  roleId: PERMISSION_READ_USER,
  description: 'Xem tài khoản',
});

export const PERMISSION_READ_ROLE = 'role.read';
allRoles.push({
  roleId: PERMISSION_READ_ROLE,
  description: 'Xem Role',
});

export const PERMISSION_CREATE_COMMON = 'common.create';
allRoles.push({
  roleId: PERMISSION_CREATE_COMMON,
  description: 'Tạo Common',
});

export const PERMISSION_UPDATE_COMMON = 'common.update';
allRoles.push({
  roleId: PERMISSION_UPDATE_COMMON,
  description: 'Cập nhật Common',
});

export const PERMISSION_REMOVE_COMMON = 'common.remove';
allRoles.push({
  roleId: PERMISSION_REMOVE_COMMON,
  description: 'Xóa Common',
});

export const PERMISSION_READ_COMMON = 'common.read';
allRoles.push({
  roleId: PERMISSION_READ_COMMON,
  description: 'Xem Common',
});

export const PERMISSION_CREATE_PROFILE = 'profile.create';
allRoles.push({
  roleId: PERMISSION_CREATE_PROFILE,
  description: 'Tạo Profile',
});

export const PERMISSION_UPDATE_PROFILE = 'profile.update';
allRoles.push({
  roleId: PERMISSION_UPDATE_PROFILE,
  description: 'Cập nhật Profile',
});

export const PERMISSION_REMOVE_PROFILE = 'profile.remove';
allRoles.push({
  roleId: PERMISSION_REMOVE_PROFILE,
  description: 'Xóa Profile',
});

export const PERMISSION_READ_PROFILE = 'profile.read';
allRoles.push({
  roleId: PERMISSION_READ_PROFILE,
  description: 'Xem Profile',
});

export const PERMISSION_CREATE_PRODUCT = 'product.create';
allRoles.push({
  roleId: PERMISSION_CREATE_PRODUCT,
  description: 'Tạo Product',
});

export const PERMISSION_UPDATE_PRODUCT = 'product.update';
allRoles.push({
  roleId: PERMISSION_UPDATE_PRODUCT,
  description: 'Cập nhật Product',
});

export const PERMISSION_REMOVE_PRODUCT = 'product.remove';
allRoles.push({
  roleId: PERMISSION_REMOVE_PRODUCT,
  description: 'Xoá Product',
});

export const PERMISSION_READ_PRODUCT = 'product.read';
allRoles.push({
  roleId: PERMISSION_READ_PRODUCT,
  description: 'Xem Product',
});

export const PERMISSION_UPDATE_ORDER = 'order.update';
allRoles.push({
  roleId: PERMISSION_UPDATE_ORDER,
  description: 'Cập nhật Order',
});

export const PERMISSION_REMOVE_ORDER = 'order.remove';
allRoles.push({
  roleId: PERMISSION_REMOVE_ORDER,
  description: 'Xoá Order',
});

export const PERMISSION_READ_ORDER = 'order.read';
allRoles.push({
  roleId: PERMISSION_READ_ORDER,
  description: 'Xem Order',
});

export const roles = allRoles;
