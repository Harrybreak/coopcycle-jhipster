package polytech.info4.gl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import polytech.info4.gl.web.rest.TestUtil;

class ClienteleTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Clientele.class);
        Clientele clientele1 = new Clientele();
        clientele1.setId(1L);
        Clientele clientele2 = new Clientele();
        clientele2.setId(clientele1.getId());
        assertThat(clientele1).isEqualTo(clientele2);
        clientele2.setId(2L);
        assertThat(clientele1).isNotEqualTo(clientele2);
        clientele1.setId(null);
        assertThat(clientele1).isNotEqualTo(clientele2);
    }
}
