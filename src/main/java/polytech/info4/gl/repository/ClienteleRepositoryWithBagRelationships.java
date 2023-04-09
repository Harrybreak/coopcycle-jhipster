package polytech.info4.gl.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import polytech.info4.gl.domain.Clientele;

public interface ClienteleRepositoryWithBagRelationships {
    Optional<Clientele> fetchBagRelationships(Optional<Clientele> clientele);

    List<Clientele> fetchBagRelationships(List<Clientele> clienteles);

    Page<Clientele> fetchBagRelationships(Page<Clientele> clienteles);
}
