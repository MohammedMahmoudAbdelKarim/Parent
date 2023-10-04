import { FormControl, FormGroup } from '@angular/forms';

export interface LoginFormModel extends FormGroup {
  username?: FormControl<string | null>;
  password?: FormControl<string | null>;
}
