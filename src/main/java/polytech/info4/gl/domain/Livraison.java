package polytech.info4.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Livraison.
 */
@Entity
@Table(name = "livraison")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Livraison implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "identite", nullable = false, unique = true)
    private String identite;

    @Column(name = "vehicule")
    private String vehicule;

    @NotNull
    @Column(name = "disponible", nullable = false)
    private Boolean disponible;

    @JsonIgnoreProperties(value = { "livraison", "clientele", "commerce" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Panier panier;

    @ManyToOne
    @JsonIgnoreProperties(value = { "clienteles", "livraisons", "commerce", "commerce" }, allowSetters = true)
    private Cooperative cooperative;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Livraison id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentite() {
        return this.identite;
    }

    public Livraison identite(String identite) {
        this.setIdentite(identite);
        return this;
    }

    public void setIdentite(String identite) {
        this.identite = identite;
    }

    public String getVehicule() {
        return this.vehicule;
    }

    public Livraison vehicule(String vehicule) {
        this.setVehicule(vehicule);
        return this;
    }

    public void setVehicule(String vehicule) {
        this.vehicule = vehicule;
    }

    public Boolean getDisponible() {
        return this.disponible;
    }

    public Livraison disponible(Boolean disponible) {
        this.setDisponible(disponible);
        return this;
    }

    public void setDisponible(Boolean disponible) {
        this.disponible = disponible;
    }

    public Panier getPanier() {
        return this.panier;
    }

    public void setPanier(Panier panier) {
        this.panier = panier;
    }

    public Livraison panier(Panier panier) {
        this.setPanier(panier);
        return this;
    }

    public Cooperative getCooperative() {
        return this.cooperative;
    }

    public void setCooperative(Cooperative cooperative) {
        this.cooperative = cooperative;
    }

    public Livraison cooperative(Cooperative cooperative) {
        this.setCooperative(cooperative);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Livraison)) {
            return false;
        }
        return id != null && id.equals(((Livraison) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Livraison{" +
            "id=" + getId() +
            ", identite='" + getIdentite() + "'" +
            ", vehicule='" + getVehicule() + "'" +
            ", disponible='" + getDisponible() + "'" +
            "}";
    }
}
