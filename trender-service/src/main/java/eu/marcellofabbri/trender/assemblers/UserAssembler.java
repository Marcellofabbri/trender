package eu.marcellofabbri.trender.assemblers;

import eu.marcellofabbri.trender.model.dto.UserRequestCreate;
import eu.marcellofabbri.trender.model.entity.User;

public class UserAssembler {
  public User requestCreateToDomainObject(UserRequestCreate userRequestCreate) {
    User user = new User(
            userRequestCreate.getUsername(),
            userRequestCreate.getPassword()
    );
    return user;
  }
}
