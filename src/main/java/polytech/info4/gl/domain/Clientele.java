package polytech.info4.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Clientele.
 */
@Entity
@Table(name = "clientele")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Clientele implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @OneToMany(mappedBy = "clientele")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "livraison", "clientele", "commerce" }, allowSetters = true)
    private Set<Panier> paniers = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_clientele__commerce",
        joinColumns = @JoinColumn(name = "clientele_id"),
        inverseJoinColumns = @JoinColumn(name = "commerce_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "paniers", "cooperative", "cooperative", "clienteles" }, allowSetters = true)
    private Set<Commerce> commerce = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = { "clienteles", "livraisons", "commerce", "commerce" }, allowSetters = true)
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Clientele id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Panier> getPaniers() {
        return this.paniers;
    }

    public void setPaniers(Set<Panier> paniers) {
        if (this.paniers != null) {
            this.paniers.forEach(i -> i.setClientele(null));
        }
        if (paniers != null) {
            paniers.forEach(i -> i.setClientele(this));
        }
        this.paniers = paniers;
    }

    public Clientele paniers(Set<Panier> paniers) {
        this.setPaniers(paniers);
        return this;
    }

    public Clientele addPanier(Panier panier) {
        this.paniers.add(panier);
        panier.setClientele(this);
        return this;
    }

    public Clientele removePanier(Panier panier) {
        this.paniers.remove(panier);
        panier.setClientele(null);
        return this;
    }

    public Set<Commerce> getCommerce() {
        return this.commerce;
    }

    public void setCommerce(Set<Commerce> commerce) {
        this.commerce = commerce;
    }

    public Clientele commerce(Set<Commerce> commerce) {
        this.setCommerce(commerce);
        return this;
    }

    public Clientele addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.getClienteles().add(this);
        return this;
    }

    public Clientele removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.getClienteles().remove(this);
        return this;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Clientele cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Clientele)) {
            return false;
        }
        return id != null && id.equals(((Clientele) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Clientele{" +
            "id=" + getId() +
            "}";
    }
}
