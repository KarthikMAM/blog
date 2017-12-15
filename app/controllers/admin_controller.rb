# frozen_string_literal: true

class AdminController < ApplicationController
  def new
    respond_to do |format|
      format.html
      format.json do
        render json: {
          success:              true,
          authentication_token: form_authenticity_token
        }
      end
    end
  end

  def create
    if log_in(params[:user], params[:password])
      respond_to do |format|
        format.json { render json: { success: true } }
        format.html do
          flash.now[:success] = 'Login Successful'
          redirect_to admin_path
        end
      end
    else
      respond_to do |format|
        format.json { render json: { success: false, error: [['Login Failed', 'User id / password mismatch']] } }
        format.html do
          flash[:error] = [['Login Failed: ', 'User id / password mismatch']]
          redirect_to login_path
        end
      end
    end
  end

  def destroy
    log_out
    redirect_to login_path
  end

  def show
    unless logged_in?
      flash[:error] = [['Session:', 'Session not created']]
      redirect_to login_path
    end
  end
end
