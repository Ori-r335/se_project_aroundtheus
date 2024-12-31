export default class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._nameElement.textContent = name; // Updates the name on the page
    this._jobElement.textContent = job; // Updates the job on the page
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
