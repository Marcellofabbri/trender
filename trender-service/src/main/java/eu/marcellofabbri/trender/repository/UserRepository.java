package eu.marcellofabbri.trender.repository;

import eu.marcellofabbri.trender.model.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

}
