export const emailValidation = (email: string) => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email)) {
    return true;
  } else {
    return false;
  }
};

export const isValidUuid = (uuid: string) => {
  if (
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(
      uuid
    )
  ) {
    return true;
  } else {
    return false;
  }
};
