package polytech.info4.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Cooperative.
 */
@Entity
@Table(name = "cooperative")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Cooperative implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "nom", nullable = false)
    private String nom;

    @NotNull
    @Column(name = "canton", nullable = false)
    private String canton;

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "paniers", "commerce", "cooperative" }, allowSetters = true)
    private Set<Clientele> clienteles = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "panier", "cooperative" }, allowSetters = true)
    private Set<Livraison> livraisons = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "paniers", "cooperative", "cooperative", "clienteles" }, allowSetters = true)
    private Set<Commerce> commerce = new HashSet<>();

    @OneToMany(mappedBy = "cooperative")
    @OneToMany(mappedBy = "cooperative")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "paniers", "cooperative", "cooperative", "clienteles" }, allowSetters = true)
    private Set<Commerce> commerce = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Cooperative id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return this.nom;
    }

    public Cooperative nom(String nom) {
        this.setNom(nom);
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getCanton() {
        return this.canton;
    }

    public Cooperative canton(String canton) {
        this.setCanton(canton);
        return this;
    }

    public void setCanton(String canton) {
        this.canton = canton;
    }

    public Set<Clientele> getClienteles() {
        return this.clienteles;
    }

    public void setClienteles(Set<Clientele> clienteles) {
        if (this.clienteles != null) {
            this.clienteles.forEach(i -> i.setCooperative(null));
        }
        if (clienteles != null) {
            clienteles.forEach(i -> i.setCooperative(this));
        }
        this.clienteles = clienteles;
    }

    public Cooperative clienteles(Set<Clientele> clienteles) {
        this.setClienteles(clienteles);
        return this;
    }

    public Cooperative addClientele(Clientele clientele) {
        this.clienteles.add(clientele);
        clientele.setCooperative(this);
        return this;
    }

    public Cooperative removeClientele(Clientele clientele) {
        this.clienteles.remove(clientele);
        clientele.setCooperative(null);
        return this;
    }

    public Set<Livraison> getLivraisons() {
        return this.livraisons;
    }

    public void setLivraisons(Set<Livraison> livraisons) {
        if (this.livraisons != null) {
            this.livraisons.forEach(i -> i.setCooperative(null));
        }
        if (livraisons != null) {
            livraisons.forEach(i -> i.setCooperative(this));
        }
        this.livraisons = livraisons;
    }

    public Cooperative livraisons(Set<Livraison> livraisons) {
        this.setLivraisons(livraisons);
        return this;
    }

    public Cooperative addLivraison(Livraison livraison) {
        this.livraisons.add(livraison);
        livraison.setCooperative(this);
        return this;
    }

    public Cooperative removeLivraison(Livraison livraison) {
        this.livraisons.remove(livraison);
        livraison.setCooperative(null);
        return this;
    }

    public Set<Commerce> getCommerce() {
        return this.commerce;
    }

    public void setCommerce(Set<Commerce> commerce) {
        if (this.commerce != null) {
            this.commerce.forEach(i -> i.setCooperative(null));
        }
        if (commerce != null) {
            commerce.forEach(i -> i.setCooperative(this));
        }
        this.commerce = commerce;
    }

    public Cooperative commerce(Set<Commerce> commerce) {
        this.setCommerce(commerce);
        return this;
    }

    public Cooperative addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.setCooperative(this);
        return this;
    }

    public Cooperative removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.setCooperative(null);
        return this;
    }

    public Set<Commerce> getCommerce() {
        return this.commerce;
    }

    public void setCommerce(Set<Commerce> commerce) {
        if (this.commerce != null) {
            this.commerce.forEach(i -> i.setCooperative(null));
        }
        if (commerce != null) {
            commerce.forEach(i -> i.setCooperative(this));
        }
        this.commerce = commerce;
    }

    public Cooperative commerce(Set<Commerce> commerce) {
        this.setCommerce(commerce);
        return this;
    }

    public Cooperative addCommerce(Commerce commerce) {
        this.commerce.add(commerce);
        commerce.setCooperative(this);
        return this;
    }

    public Cooperative removeCommerce(Commerce commerce) {
        this.commerce.remove(commerce);
        commerce.setCooperative(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Cooperative)) {
            return false;
        }
        return id != null && id.equals(((Cooperative) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Cooperative{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", canton='" + getCanton() + "'" +
            "}";
    }
}
