package polytech.info4.gl.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import polytech.info4.gl.domain.enumeration.EtatLivraison;
import polytech.info4.gl.domain.enumeration.Paiement;

/**
 * A Panier.
 */
@Entity
@Table(name = "panier")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Panier implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "etat", nullable = false)
    private EtatLivraison etat;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "paiement", nullable = false)
    private Paiement paiement;

    @Column(name = "date_commande")
    private Instant dateCommande;

    @JsonIgnoreProperties(value = { "panier", "cooperative" }, allowSetters = true)
    @OneToOne(mappedBy = "panier")
    private Livraison livraison;

    @ManyToOne
    @JsonIgnoreProperties(value = { "paniers", "commerce", "cooperative" }, allowSetters = true)
    private Clientele clientele;

    @ManyToOne
    @JsonIgnoreProperties(value = { "paniers", "cooperative", "cooperative", "clienteles" }, allowSetters = true)
    private Commerce commerce;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Panier id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public EtatLivraison getEtat() {
        return this.etat;
    }

    public Panier etat(EtatLivraison etat) {
        this.setEtat(etat);
        return this;
    }

    public void setEtat(EtatLivraison etat) {
        this.etat = etat;
    }

    public Paiement getPaiement() {
        return this.paiement;
    }

    public Panier paiement(Paiement paiement) {
        this.setPaiement(paiement);
        return this;
    }

    public void setPaiement(Paiement paiement) {
        this.paiement = paiement;
    }

    public Instant getDateCommande() {
        return this.dateCommande;
    }

    public Panier dateCommande(Instant dateCommande) {
        this.setDateCommande(dateCommande);
        return this;
    }

    public void setDateCommande(Instant dateCommande) {
        this.dateCommande = dateCommande;
    }

    public Livraison getLivraison() {
        return this.livraison;
    }

    public void setLivraison(Livraison livraison) {
        if (this.livraison != null) {
            this.livraison.setPanier(null);
        }
        if (livraison != null) {
            livraison.setPanier(this);
        }
        this.livraison = livraison;
    }

    public Panier livraison(Livraison livraison) {
        this.setLivraison(livraison);
        return this;
    }

    public Clientele getClientele() {
        return this.clientele;
    }

    public void setClientele(Clientele clientele) {
        this.clientele = clientele;
    }

    public Panier clientele(Clientele clientele) {
        this.setClientele(clientele);
        return this;
    }

    public Commerce getCommerce() {
        return this.commerce;
    }

    public void setCommerce(Commerce commerce) {
        this.commerce = commerce;
    }

    public Panier commerce(Commerce commerce) {
        this.setCommerce(commerce);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Panier)) {
            return false;
        }
        return id != null && id.equals(((Panier) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Panier{" +
            "id=" + getId() +
            ", etat='" + getEtat() + "'" +
            ", paiement='" + getPaiement() + "'" +
            ", dateCommande='" + getDateCommande() + "'" +
            "}";
    }
}
