        jQuery(document).ready(function($) {
			

            function limpa_formulario_cnpj(obj) {
                if (obj && obj.length > 0) {
                // Limpa valores do formulário de CNPJ.
                obj.closest('form').find(".cnpj-autofill__razao_social, .cnpj-autofill__razao_social input").val("");
                obj.closest('form').find(".cnpj-autofill__nome_fantasia, .cnpj-autofill__nome_fantasia input").val("");
                // obj.closest('form').find(".cnpj-autofill__inscricao_municipal, .cnpj-autofill__inscricao_municipal input").val("");
                obj.closest('form').find(".cnpj-autofill__inscricao_estadual, .cnpj-autofill__inscricao_estadual input").val("");
                obj.closest('form').find(".cnpj-autofill__ramo_atividade, .cnpj-autofill__ramo_atividade input").val("");
            }
        }
            
            //Quando o campo CNPJ perde o foco.
            $(".cnpj-autofill, .cnpj-autofill input").on('blur', function() {
				
				var obj = $(this);

                //Nova variável "cnpj" somente com dígitos.
                var cnpj = obj.val().replace(/\D/g, '');

                //Verifica se campo CNPJ possui valor informado.
                if (cnpj != "") {

                    //Expressão regular para validar o CNPJ.
                    var validacnpj = /^[0-9]{14}$/;

                    //Valida o formato do CNPJ.
                    if(validacnpj.test(cnpj)) {

                        //Preenche os campos com "..." enquanto consulta webservice.
                        obj.closest('form').find(".cnpj-autofill__razao_social, .cnpj-autofill__razao_social input").val("...");
                        obj.closest('form').find(".cnpj-autofill__nome_fantasia, .cnpj-autofill__nome_fantasia input").val("...");
                        // obj.closest('form').find(".cnpj-autofill__inscricao_municipal, .cnpj-autofill__inscricao_municipal input").val("...");
                        obj.closest('form').find(".cnpj-autofill__inscricao_estadual, .cnpj-autofill__inscricao_estadual input").val("...");
                        obj.closest('form').find(".cnpj-autofill__ramo_atividade, .cnpj-autofill__ramo_atividade input").val("...");

                        //Consulta o webservice publica.cnpj.ws/cnpj/
                        $.getJSON("https://publica.cnpj.ws/cnpj/"+ cnpj, function(dados) {

                            if (!("erro" in dados)) {
                                //Atualiza os campos com os valores da consulta.
                                obj.closest('form').find(".cnpj-autofill__razao_social, .cnpj-autofill__razao_social input").val(dados.razao_social);
                                obj.closest('form').find(".cnpj-autofill__nome_fantasia, .cnpj-autofill__nome_fantasia input").val(dados.estabelecimento.nome_fantasia);
                                // obj.closest('form').find(".cnpj-autofill__cidade, .cnpj-autofill__cidade input").val(dados.localidade);
                                obj.closest('form').find(".cnpj-autofill__inscricao_estadual, .cnpj-autofill__inscricao_estadual input").val(dados.estabelecimento.inscricoes_estaduais[0].inscricao_estadual);
                                obj.closest('form').find(".cnpj-autofill__ramo_atividade, .cnpj-autofill__ramo_atividade input").val(dados.estabelecimento.atividade_principal.descricao);
                            } //end if.
                            else {
                                //CNPJ pesquisado não foi encontrado.
                                limpa_formulario_cnpj(obj);
                                alert("CNPJ não encontrado.");
                            }
                        });
                    } //end if.
                    else {
                        //cnpj é inválido.
                        limpa_formulario_cnpj();
                        alert("Formato de CNPJ inválido.");
                    }
                } //end if.
                else {
                    //cnpj sem valor, limpa formulário.
                    limpa_formulario_cnpj();
                }
            });
        });