package polytech.info4.gl.domain;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import polytech.info4.gl.web.rest.TestUtil;

class MaintenanceTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Maintenance.class);
        Maintenance maintenance1 = new Maintenance();
        maintenance1.setId(1L);
        Maintenance maintenance2 = new Maintenance();
        maintenance2.setId(maintenance1.getId());
        assertThat(maintenance1).isEqualTo(maintenance2);
        maintenance2.setId(2L);
        assertThat(maintenance1).isNotEqualTo(maintenance2);
        maintenance1.setId(null);
        assertThat(maintenance1).isNotEqualTo(maintenance2);
    }
}
