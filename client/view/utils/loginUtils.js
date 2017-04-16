export const isValidUsername = username => !username.length;
export const isValidEmail = email => (
  email.indexOf('@') === -1 && email.indexOf('.' === -1)
);
export const isValidPassword = password => password.length < 6;
export const isValidForm = errors => Object.keys(errors).length;

export const errorMessages = {
  username: 'Can not be empty',
  email: 'Must be a vaild email',
  password: 'Password must be at least 6 characters long',
};
