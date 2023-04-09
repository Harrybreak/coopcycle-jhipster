package polytech.info4.gl.repository;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import polytech.info4.gl.domain.Clientele;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class ClienteleRepositoryWithBagRelationshipsImpl implements ClienteleRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Clientele> fetchBagRelationships(Optional<Clientele> clientele) {
        return clientele.map(this::fetchCommerce);
    }

    @Override
    public Page<Clientele> fetchBagRelationships(Page<Clientele> clienteles) {
        return new PageImpl<>(fetchBagRelationships(clienteles.getContent()), clienteles.getPageable(), clienteles.getTotalElements());
    }

    @Override
    public List<Clientele> fetchBagRelationships(List<Clientele> clienteles) {
        return Optional.of(clienteles).map(this::fetchCommerce).orElse(Collections.emptyList());
    }

    Clientele fetchCommerce(Clientele result) {
        return entityManager
            .createQuery(
                "select clientele from Clientele clientele left join fetch clientele.commerce where clientele is :clientele",
                Clientele.class
            )
            .setParameter("clientele", result)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Clientele> fetchCommerce(List<Clientele> clienteles) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, clienteles.size()).forEach(index -> order.put(clienteles.get(index).getId(), index));
        List<Clientele> result = entityManager
            .createQuery(
                "select distinct clientele from Clientele clientele left join fetch clientele.commerce where clientele in :clienteles",
                Clientele.class
            )
            .setParameter("clienteles", clienteles)
            .setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
