package polytech.info4.gl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import polytech.info4.gl.web.rest.TestUtil;

class PanierTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Panier.class);
        Panier panier1 = new Panier();
        panier1.setId(1L);
        Panier panier2 = new Panier();
        panier2.setId(panier1.getId());
        assertThat(panier1).isEqualTo(panier2);
        panier2.setId(2L);
        assertThat(panier1).isNotEqualTo(panier2);
        panier1.setId(null);
        assertThat(panier1).isNotEqualTo(panier2);
    }
}
