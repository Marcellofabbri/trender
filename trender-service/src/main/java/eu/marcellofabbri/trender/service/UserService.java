package eu.marcellofabbri.trender.service;

import eu.marcellofabbri.trender.model.dto.UserRequestCreate;
import eu.marcellofabbri.trender.model.dto.UserResponse;
import eu.marcellofabbri.trender.model.entity.User;
import eu.marcellofabbri.trender.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

  @Autowired
  private UserRepository newUserRepository;

  public UserResponse createUser(UserRequestCreate request) {
    User newUser = new User(request.getUsername(), request.getPassword());
    User save = newUserRepository.save(newUser);
    UserResponse response = new UserResponse(save.getId(), save.getUsername(), save.getPassword());
    return response;
  }
}
