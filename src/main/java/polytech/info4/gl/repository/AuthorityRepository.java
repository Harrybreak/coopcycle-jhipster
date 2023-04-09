package polytech.info4.gl.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import polytech.info4.gl.domain.Authority;

/**
 * Spring Data JPA repository for the {@link Authority} entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {}
