package eu.marcellofabbri.trender.controller;

import eu.marcellofabbri.trender.assemblers.UserAssembler;
import eu.marcellofabbri.trender.model.dto.UserRequestCreate;
import eu.marcellofabbri.trender.model.dto.UserResponse;
import eu.marcellofabbri.trender.model.dto.UserRequestCreate;
import eu.marcellofabbri.trender.model.dto.UserResponse;
import eu.marcellofabbri.trender.model.entity.Chart;
import eu.marcellofabbri.trender.model.entity.User;
import eu.marcellofabbri.trender.model.entity.User;
import eu.marcellofabbri.trender.repository.UserRepository;
import eu.marcellofabbri.trender.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class UserController {
  UserAssembler userAssembler;

  @Autowired
  UserRepository userRepository;

  @Autowired
  UserService userService;

  @GetMapping("/users")
  public List<User> getAllUsers() {

    List<User> list = new ArrayList<>();
    Iterable<User> trackers = userRepository.findAll();
    trackers.forEach(list::add);
    return list;
  }

  @PostMapping("/users")
  public UserResponse createUser(@RequestBody @Valid UserRequestCreate request) {
    return userService.createUser(request);
  }

  @GetMapping("/users/{id}")
  public ResponseEntity<User> getUser(@PathVariable("id") Long id) {

    Optional<User> userData = userRepository.findById(id);
    if (userData.isPresent()) {
      return new ResponseEntity<>(userData.get(), HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }


  @PutMapping("/users/{id}")
  public ResponseEntity<User> updateUser(@PathVariable("id") Long id, @RequestBody UserRequestCreate userRequestCreate) {

    User user = userAssembler.requestCreateToDomainObject(userRequestCreate);
    Optional<User> userData = userRepository.findById(id);
    if (userData.isPresent()) {
      User savedUser = userData.get();
      savedUser.setUsername(user.getUsername());
      savedUser.setPassword(user.getPassword());

      User updatedUser = userRepository.save(savedUser);
      return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    } else {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
  }

  @DeleteMapping("/users/{id}")
  public ResponseEntity<String> deleteUser(@PathVariable("id") Long id) {

    try {
      userRepository.deleteById(id);
    } catch(Exception e) {
      return new ResponseEntity<>("Failed to delete", HttpStatus.EXPECTATION_FAILED);
    }
    return new ResponseEntity<>("User has been deleted", HttpStatus.OK);
  }

}
